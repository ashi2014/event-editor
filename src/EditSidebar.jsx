import * as React from "react";
import { Form, FormGroup, Input, Label, Button } from "reactstrap";
import { updateEvent } from "./service";

export const EditSidebar = (props) => {
  const getInitialCheckboxState = (eventData, allTags) => {
    const checkboxes = {};
    allTags.forEach((tag) => {
      checkboxes[tag.id] = !!eventData.tags.find(
        (eventTag) => eventTag.id === tag.id
      );
    });
    return checkboxes;
  };
  const [checkboxStates, setCheckboxStates] = React.useState(
    getInitialCheckboxState(props.eventData, props.allTags)
  );

  React.useEffect(() => {
    setCheckboxStates(getInitialCheckboxState(props.eventData, props.allTags));
  }, [props.eventData, props.allTags]);

  const toggleCheckbox = (tagId) => {
    setCheckboxStates({
      ...checkboxStates,
      [tagId]: !checkboxStates[tagId],
    });
  };

  const getSelectedTagIds = () => {
    return Object.keys(checkboxStates)
      .filter((id) => !!checkboxStates[id])
      .map((id) => Number(id));
  };

  const onSave = async (event) => {
    event.preventDefault();
    const tagIds = getSelectedTagIds();
    const updated = await updateEvent({
      id: props.eventData.id,
      tags: tagIds,
    });
    props.onUpdate(updated);
  };

  return (
    <div className="p-3">
      <div>
        <div>Event Name:</div>
        <div>{props.eventData && props.eventData.event}</div>
      </div>
      <div className="mt-3">
        <div>Description:</div>
        <div>{props.eventData && props.eventData.description}</div>
      </div>
      <div className="mt-3">
        <div>Select Tags:</div>
        <Form onSubmit={onSave}>
          {props.allTags.map((tag) => {
            return (
              <FormGroup key={tag.id} check>
                <Input
                  type="checkbox"
                  checked={checkboxStates[tag.id]}
                  onChange={() => toggleCheckbox(tag.id)}
                />
                <Label check>{tag.name}</Label>
              </FormGroup>
            );
          })}
          <Button type="submit">Save</Button>
          <Button onClick={props.onCancel}>Cancel</Button>
        </Form>
      </div>
    </div>
  );
};
