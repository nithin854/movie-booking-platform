import { Card, Space, Flex } from "antd";
import { useNavigate } from "react-router-dom";
function MovieCard(props) {
  const { _id, title, description, duration, genre, language, posterUrl } =
    props;
  const navigate = useNavigate();
  return (
    <Card onClick={() => navigate(`/movie/${_id}`)} className="movie-card">
      <Flex gap={20}>
        <img width={200} src={posterUrl} alt="Movie image" />
        <Space direction="vertical">
          <h2>{title}</h2>
          <p>{description}</p>
          <p>Duration : {duration} Minutes</p>
          <p>Genre : {genre}</p>
          <p>Language : {language}</p>
        </Space>
      </Flex>
    </Card>
  );
}

MovieCard.propTypes = {
  _id: String,
  title: String,
  description: String,
  duration: Number,
  genre: String,
  language: String,
  posterUrl: String,
};

export default MovieCard;
