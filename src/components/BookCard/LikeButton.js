//api book
import { toggleLike } from "../../api/books";

//material UI
import { IconButton } from "@mui/material";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";

export default function LikeButton({ isLike, setIsLike, book }) {
  async function handleToggleLike() {
    try {
      await toggleLike(book.id);
      if (isLike) {
        setIsLike(false);
      } else {
        setIsLike(true);
      }
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <IconButton
      aria-label="add to favorites"
      color="primary"
      onClick={handleToggleLike}
    >
      {isLike ? <FavoriteOutlinedIcon /> : <FavoriteBorderOutlinedIcon />}
    </IconButton>
  );
}
