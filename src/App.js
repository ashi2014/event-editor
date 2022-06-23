import "./App.css";
import { getEvents, getTags, generateTableData } from "./service";
import * as React from "react";
import EventTable from "./EventTable";
import { EditSidebar } from "./EditSidebar";

export const App = () => {
  const [events, setEvents] = React.useState(null);
  const [tags, setTags] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [selectedEvent, setSelectedEvent] = React.useState(null);

  React.useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const events = await getEvents();
      const tags = await getTags();
      setEvents(events);
      setTags(tags);

      setIsLoading(false);
    };

    fetchData();
  }, []);

  const onRowClick = (selectedEvent) => {
    console.log("selectedEvent", selectedEvent);
    setSelectedEvent(selectedEvent);
  };

  const onCancel = () => {
    setSelectedEvent(null);
  };

  const onUpdate = (event) => {
    const updatedEvents = [...events];
    const index = updatedEvents.findIndex((row) => event.id === row.id);
    updatedEvents[index] = event;
    setEvents(updatedEvents);
    setSelectedEvent(null);
  };

  if (isLoading) {
    return <div>Loading</div>;
  }

  const tableData = generateTableData(events, tags);
  return (
    <div className="d-flex">
      <div>
        {tableData && (
          <div className="App">
            <EventTable tableData={tableData} onRowClick={onRowClick} />
          </div>
        )}
      </div>
      {selectedEvent && (
        <div className="edit-sidebar">
          <EditSidebar
            eventData={selectedEvent}
            allTags={tags}
            onCancel={onCancel}
            onUpdate={onUpdate}
          />
        </div>
      )}
    </div>
  );
};

export default App;
