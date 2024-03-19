import { useState } from "react";
import { useSelector } from "react-redux";
import { Tabs, Button, Flex, Card, Popconfirm, Space, Tag } from "antd";
import AddMovieForm from "../../components/AddMovieForm";
import AddTheatreForm from "../../components/AddTheatreForm";
import UpdateTheatreForm from "../../components/UpdateTheatreForm";
import AddShowForm from "../../components/AddShowForm";
import {
  useGetAllMoviesQuery,
  useDeleteMovieMutation,
} from "../../services/movieServices";
import {
  useGetAllTheatresQuery,
  useUpdateTheatreMutation,
} from "../../services/theatreServices";
import EmptyState from "../../components/EmptyState";

function AdminProfilePage() {
  const [selectedTheatre, setSelectedTheatre] = useState(null);
  const { user } = useSelector((state) => state.user);
  const { data: allMovies, isLoading: moviesLoading } = useGetAllMoviesQuery();
  const { data: allTheatres, isLoading: theatreLoading } =
    useGetAllTheatresQuery();
  const [updateTheatre] = useUpdateTheatreMutation();

  const [addMovieForm, openAddMovieForm] = useState(false);
  const [addTheatreForm, openTheatreForm] = useState(false);
  const [updateTheatreForm, openUpdateTheatreForm] = useState(false);
  const [addShowForm, openShowForm] = useState(false);
  const [deleteMovie] = useDeleteMovieMutation();

  const onMovieDeleteConfirmHandler = async (id) => {
    await deleteMovie({ movieId: id });
  };

  if (moviesLoading || theatreLoading) {
    return <p>Loading...</p>;
  }

  const items = [
    {
      key: "admin-movies",
      label: "Movies",
      children: (
        <Flex vertical gap={20}>
          <Flex justify="end">
            <Button onClick={() => openAddMovieForm(true)} type="primary">
              Add Movie
            </Button>
          </Flex>
          <Flex vertical gap={10}>
            {allMovies.length ? (
              allMovies?.map((movie) => (
                <Card key={movie._id} title={movie.title}>
                  <Flex gap={20} justify="space-between" align="center">
                    <Space>
                      <img width={150} src={movie.posterUrl} alt="" />
                      <p>{movie.description}</p>
                    </Space>
                    <Popconfirm
                      placement="topLeft"
                      title="Delete Movie"
                      description="Are you sure to delete this movie?"
                      onConfirm={() => onMovieDeleteConfirmHandler(movie._id)}
                      okText="Yes"
                      cancelText="No"
                    >
                      <Button danger color="red" type="link">
                        Delete
                      </Button>
                    </Popconfirm>
                  </Flex>
                </Card>
              ))
            ) : (
              <EmptyState />
            )}
          </Flex>
          <AddMovieForm open={addMovieForm} onClose={openAddMovieForm} />
        </Flex>
      ),
    },
    {
      key: "admin-theatres",
      label: "Theatres",
      children: (
        <Flex vertical gap={10}>
          <Flex justify="end">
            <Button onClick={() => openTheatreForm(true)} type="primary">
              Add Theatre
            </Button>
          </Flex>
          {allTheatres.length ? (
            allTheatres?.map((theatre) => (
              <Card key={theatre._id}>
                <Space direction="vertical">
                  {!theatre.isActive && user.userId === theatre.owner._id ? (
                    <button
                      onClick={async () => {
                        const updatedValues = {
                          ...theatre,
                          isActive: true,
                        };
                        await updateTheatre(updatedValues);
                      }}
                    >
                      Make Active
                    </button>
                  ) : null}
                  {theatre.isActive && user.userId === theatre.owner._id ? (
                    <button onClick={() => openShowForm(true)}>
                      Add Shows
                    </button>
                  ) : null}
                  <h2>{theatre.name}</h2>
                  <h3>{theatre.address}</h3>
                  <p>Owner : {theatre.owner.userName}</p>
                  {theatre.isActive ? (
                    <Tag color="green">{"Active"}</Tag>
                  ) : null}
                  {!theatre.isActive ? (
                    <Tag color="red">{"Inactive"}</Tag>
                  ) : null}
                  {user.userId === theatre.owner._id ? (
                    <Flex gap={10}>
                      <button>Delete Theatre</button>
                      <Button
                        onClick={() => {
                          setSelectedTheatre(theatre);
                          openUpdateTheatreForm(true);
                        }}
                      >
                        Update Theatre
                      </Button>
                    </Flex>
                  ) : null}
                  <UpdateTheatreForm
                    data={theatre}
                    open={updateTheatreForm}
                    onClose={openUpdateTheatreForm}
                  />
                </Space>
              </Card>
            ))
          ) : (
            <EmptyState />
          )}
          <AddTheatreForm open={addTheatreForm} onClose={openTheatreForm} />
          <UpdateTheatreForm
            data={selectedTheatre}
            open={updateTheatreForm}
            onClose={openUpdateTheatreForm}
          />
          <AddShowForm open={addShowForm} onClose={openShowForm} />
        </Flex>
      ),
    },
  ];
  return <Tabs centered size="large" defaultActiveKey="1" items={items} />;
}

export default AdminProfilePage;
