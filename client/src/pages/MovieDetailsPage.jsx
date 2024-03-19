import { useEffect, useState } from "react";
import { DatePicker, Flex, Image, Space, Card, Button } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { format } from "date-fns";
import { useGetSingleMovieQuery } from "../services/movieServices";
import { useGetTheatresByMovieMutation } from "../services/theatreServices";
import EmptyState from "../components/EmptyState";

function MovieDetailsPage() {
  const [theatresForSelectedDate, setTheatresForSelectedDate] = useState([]);
  const [selectedBookingDate, setSelectedBookingDate] = useState(
    format(new Date(), "dd-MM-yyyy")
  );
  const navigate = useNavigate();
  const { id } = useParams();
  const { data: movieDetails, isLoading } = useGetSingleMovieQuery(id);
  const [theatresByMovie] = useGetTheatresByMovieMutation();

  useEffect(() => {
    async function getTheatresByMovie() {
      const response = await theatresByMovie({
        movie: id,
        date: selectedBookingDate,
      });
      if (!response?.data?.data.length) {
        setTheatresForSelectedDate([]);
      }
      if (response?.data?.data.length) {
        setTheatresForSelectedDate(response?.data?.data);
      }
    }
    getTheatresByMovie();
  }, [selectedBookingDate, id, theatresByMovie]);
  if (isLoading) {
    return <p>Loading...</p>;
  }
  const {
    title,
    description,
    genre,
    duration,
    releaseDate,
    language,
    posterUrl,
  } = movieDetails;

  function onBookingDateSelectHandler(date, dateString) {
    navigate(`/movie/${id}?date=${dateString}`);
    setSelectedBookingDate(format(new Date(date), "dd-MM-yyyy"));
  }
  return (
    <>
      <div className="movie-information-grid">
        <Image src={posterUrl} />
        <Space size={20} direction="vertical">
          <h1>{title}</h1>
          <p>{description}</p>
          <h3>Genre : {genre}</h3>
          <h3>Language : {language}</h3>
          <h3>Duration : {duration} min</h3>
          <h3>Release Date : {releaseDate}</h3>
        </Space>
      </div>
      <Flex gap={10} align="center" justify="end">
        <h4>Select Booking Date</h4>
        <DatePicker
          allowClear={false}
          onChange={onBookingDateSelectHandler}
          format="DD-MM-YYYY"
        />
      </Flex>
      <Flex vertical gap={10}>
        <h2>Theatres</h2>
        {theatresForSelectedDate.length ? (
          theatresForSelectedDate?.map((theatre) => (
            <Card
              className="theatre-card"
              bordered={false}
              title={theatre.name}
              key={theatre._id}
            >
              <Flex gap={10}>
                {theatre.shows?.map((show) => (
                  <Button
                    onClick={() => {
                      navigate(`/book-show/${show._id}`);
                    }}
                    key={show._id}
                  >
                    {show.time}
                  </Button>
                ))}
              </Flex>
            </Card>
          ))
        ) : (
          <EmptyState />
        )}
      </Flex>
    </>
  );
}

export default MovieDetailsPage;
