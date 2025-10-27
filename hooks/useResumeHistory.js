import { useCallback, useEffect, useRef, useState } from "react";

// Small, dependency-free undo/redo history hook tailored for the resume state.
// API: const [present, set, {undo, redo, canUndo, canRedo, replace, reset}] = useResumeHistory(initial, limit)
export default function useResumeHistory(initial, limit = 20) {
  const [present, setPresent] = useState(initial);
  const pastRef = useRef([]);
  const futureRef = useRef([]);
  const limitRef = useRef(limit);

  useEffect(() => {
    limitRef.current = limit;
  }, [limit]);

  // keep a ref of current present for undo/redo operations
  const presentRef = useRef(present);
  useEffect(() => {
    presentRef.current = present;
  }, [present]);

  const set = useCallback((value) => {
    setPresent((current) => {
      const next = typeof value === "function" ? value(current) : value;

      // push current to past
      const past = pastRef.current.slice();
      past.push(current);
      // enforce cap
      if (past.length > limitRef.current) {
        past.splice(0, past.length - limitRef.current);
      }
      pastRef.current = past;

      // any new set clears future
      futureRef.current = [];

      return next;
    });
  }, []);

  const replace = useCallback((value) => {
    // set without recording history
    futureRef.current = [];
    pastRef.current = [];
    setPresent(value);
  }, []);

  const reset = useCallback((value) => {
    // alias of replace (keeps semantics clear)
    replace(value);
  }, [replace]);

  const undo = useCallback(() => {
    const past = pastRef.current;
    if (!past || past.length === 0) return false;
    const previous = past[past.length - 1];
    pastRef.current = past.slice(0, past.length - 1);
    futureRef.current = [presentRef.current, ...futureRef.current];
    setPresent(previous);
    return true;
  }, []);

  const redo = useCallback(() => {
    const future = futureRef.current;
    if (!future || future.length === 0) return false;
    const next = future[0];
    futureRef.current = future.slice(1);
    pastRef.current = [...pastRef.current, presentRef.current];
    setPresent(next);
    return true;
  }, []);

  const canUndo = () => (pastRef.current && pastRef.current.length > 0) || false;
  const canRedo = () => (futureRef.current && futureRef.current.length > 0) || false;

  return [present, set, { undo, redo, canUndo: canUndo(), canRedo: canRedo(), replace, reset }];
}
