import {
  Drawer,
  Form,
  Input,
  Button,
  InputNumber,
  Select,
  DatePicker,
} from "antd";
import { format } from "date-fns";

import { useAddNewMovieMutation } from "../services/movieServices";

const GENRES = [
  {
    value: "action",
    label: "Action",
  },
  {
    value: "drama",
    label: "Drama",
  },
  {
    value: "comedy",
    label: "Comedy",
  },
  {
    value: "horror",
    label: "Horror",
  },
  {
    value: "mystery-thriller",
    label: "Mystery/Thriller",
  },
];

const LANGUAGES = [
  {
    value: "english",
    label: "English",
  },
  {
    value: "hindi",
    label: "Hindi",
  },
  {
    value: "kannada",
    label: "Kannada",
  },
  {
    value: "tamil",
    label: "Tamil",
  },
  {
    value: "telgu",
    label: "Telgu",
  },
];

function AddMovieForm(props) {
  const [form] = Form.useForm();
  const { open, onClose } = props;
  const [addMovie] = useAddNewMovieMutation();

  const onAddMovieHandler = (values) => {
    values.releaseDate = format(new Date(values.releaseDate), "dd-MM-yyyy");
    addMovie(values).then(() => {
      form.resetFields();
      onClose(false);
    });
  };

  return (
    <Drawer
      title="Add A New Movie"
      size="large"
      placement="right"
      onClose={() => onClose(false)}
      open={open}
      destroyOnClose={true}
    >
      <Form layout="vertical" form={form} onFinish={onAddMovieHandler}>
        <Form.Item name="title" label="Title">
          <Input placeholder="Enter Movie Title" />
        </Form.Item>
        <Form.Item name="description" label="Description">
          <Input.TextArea rows={6} placeholder="Enter Movie Description" />
        </Form.Item>
        <Form.Item name="duration" label="Duration (in min)">
          <InputNumber />
        </Form.Item>
        <Form.Item name="genre" label="Genre">
          <Select options={GENRES} />
        </Form.Item>
        <Form.Item name="language" label="Language">
          <Select options={LANGUAGES} />
        </Form.Item>
        <Form.Item name="releaseDate" label="Release Date">
          <DatePicker format="DD-MM-YYYY" />
        </Form.Item>
        <Form.Item name="posterUrl" label="Poster URL">
          <Input placeholder="Enter Movie Poster" />
        </Form.Item>
        <Form.Item>
          <Button size="large" block type="primary" htmlType="submit">
            Add Movie
          </Button>
        </Form.Item>
      </Form>
    </Drawer>
  );
}

AddMovieForm.propTypes = {
  open: Boolean,
  onClose: Function,
};

export default AddMovieForm;
