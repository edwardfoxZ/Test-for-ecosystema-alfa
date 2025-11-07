import { useState } from "react";

export const useSetLikes = () => {
  const [likes, setLikes] = useState(false);

  

  return { likes, setLikes };
};
