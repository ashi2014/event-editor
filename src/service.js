import axios from "axios";

const BASE_PATH = "http://localhost:8080";

export const getEvents = async () => {
  const path = `${BASE_PATH}/events`;
  const response = await axios.get(path);

  return response.data;
};

export const getTags = async () => {
  const path = `${BASE_PATH}/tags`;
  const response = await axios.get(path);

  return response.data;
};

export const generateTableData = (events, tags) => {
  if (!events || !tags) {
    return [];
  }
  return events.map((event) => {
    const tagIds = event.tags;
    const tagsWithNames = tagIds.map((id) => {
      const tagName = tags.find((tag) => tag.id === id).name;
      return {
        id,
        name: tagName,
      };
    });
    return {
      ...event,
      tags: tagsWithNames,
    };
  });
};

export const updateEvent = async (data) => {
  try {
    const event = await axios.patch(`${BASE_PATH}/event/${data.id}`, data);
    return event.data;
  } catch (err) {
    console.log(err);
  }
};
