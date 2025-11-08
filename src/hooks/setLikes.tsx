import { useState, useCallback } from "react";

export const useSetLikes = () => {
  const [likesList, setLikesList] = useState<number[]>([]);
  const [liked, setLiked] = useState(false);

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

  return { likesList, toggleLike, isLiked, setLiked, liked };
};
