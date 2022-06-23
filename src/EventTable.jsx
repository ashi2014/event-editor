import { Table } from "reactstrap";

const renderTags = (tags) => {
  return tags.map((tag) => tag.name).join(", ");
};

const EventTable = (props) => {
  return (
    <Table>
      <thead>
        <tr>
          <th>Event Name</th>
          <th>Description</th>
          <th>Tags</th>
        </tr>
      </thead>
      <tbody>
        {props.tableData.map((data) => {
          return (
            <tr
              key={data.id}
              onClick={() => {
                console.log("event clicked", data.id);
                props.onRowClick && props.onRowClick(data);
              }}
            >
              <td>{data.event}</td>
              <td>{data.description}</td>
              <td>{renderTags(data.tags)}</td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};

export default EventTable;
