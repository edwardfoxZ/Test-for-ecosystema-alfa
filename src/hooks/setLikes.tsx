import { useState, useCallback, useEffect } from "react";

export const useSetLikes = () => {
  const [likesList, setLikesList] = useState<number[]>([]);

  // Load from localStorage
  useEffect(() => {
    const storedLikes = localStorage.getItem("likesList");
    if (storedLikes) {
      setLikesList(JSON.parse(storedLikes));
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("likesList", JSON.stringify(likesList));
  }, [likesList]);

  // Toggle product like/unlike
  const toggleLike = useCallback((productId: number) => {
    setLikesList((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  }, []);

  const isLiked = useCallback(
    (productId: number) => likesList.includes(productId),
    [likesList]
  );

  return { likesList, toggleLike, isLiked };
};
