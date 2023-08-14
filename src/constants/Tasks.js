import moment from "moment/moment";
import { TaskPriority } from "../enum/TaskPriority";

export const Tasks = [
  {
    id: "54f5g45dsf",
    heading: "Test task 1",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    image: "https://source.unsplash.com/random",
    dateTime: moment().valueOf(),
    priority: TaskPriority.HIGH,
  },
  {
    id: "54f5gfghf45dsf",
    heading: "Test task 2",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    image: "https://source.unsplash.com/random",
    dateTime: moment().valueOf(),
    priority: TaskPriority.MEDIUM,
  },
  {
    id: "54f5fghfgg45dsf",
    heading: "Just do it",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    image: "https://source.unsplash.com/random",
    dateTime: moment().valueOf(),
    priority: TaskPriority.LOW,
  },
];
