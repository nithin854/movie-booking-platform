import {
  Drawer,
  Form,
  Input,
  Select,
  Button,
  InputNumber,
  DatePicker,
  TimePicker,
} from "antd";
import { format } from "date-fns";
import { useSelector } from "react-redux";
import { useGetAllMoviesQuery } from "../services/movieServices";
import {
  useGetTheatresByOwnerQuery,
  useAddShowMutation,
} from "../services/theatreServices";
function AddShowForm(props) {
  const { user } = useSelector((state) => state.user);
  const [form] = Form.useForm();
  const { open, onClose } = props;
  const { data: movies } = useGetAllMoviesQuery();
  const { data: theatres, isLoading } = useGetTheatresByOwnerQuery(user.userId);
  const [addShow] = useAddShowMutation();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  const ownerTheatres = theatres.map((theatre) => ({
    label: theatre.name,
    value: theatre._id,
  }));

  const moviesList = movies.map((movie) => ({
    label: movie.title,
    value: movie._id,
  }));

  const onAddShowHandler = async (values) => {
    values.date = format(new Date(values.date), "dd-MM-yyyy");
    values.time = format(new Date(values.time), "HH:mm");
    const response = await addShow(values);
    if (response.data.success === false) {
      return null;
    }
    onClose(false);
    form.resetFields();
  };

  return (
    <Drawer
      title="Add A New Show"
      size="large"
      placement="left"
      onClose={() => onClose(false)}
      open={open}
      destroyOnClose={true}
    >
      {/* {format(new Date())} */}
      <Form layout="vertical" form={form} onFinish={onAddShowHandler}>
        <Form.Item name="name" label="Name">
          <Input placeholder="Enter Show Title" />
        </Form.Item>
        <Form.Item name="date" label="Show Date">
          <DatePicker format="DD/MM/YYYY" />
        </Form.Item>
        <Form.Item name="time" label="Show Time">
          <TimePicker format="HH:mm" />
        </Form.Item>
        <Form.Item name="movie" label="Select Movie">
          <Select options={moviesList} />
        </Form.Item>
        <Form.Item name="theatre" label="Select Theatre">
          <Select options={ownerTheatres} />
        </Form.Item>
        <Form.Item name="ticketPrice" label="Ticket Price">
          <InputNumber />
        </Form.Item>
        <Form.Item name="totalSeats" label="Total Seats">
          <InputNumber />
        </Form.Item>
        <Form.Item>
          <Button size="large" block htmlType="submit" type="primary">
            Add Show
          </Button>
        </Form.Item>
      </Form>
    </Drawer>
  );
}

AddShowForm.propTypes = {
  open: Boolean,
  onClose: Function,
};

export default AddShowForm;
