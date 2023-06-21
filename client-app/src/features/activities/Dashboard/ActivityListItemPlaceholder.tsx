import React, { Fragment } from "react";
import { Segment, Button, Placeholder } from "semantic-ui-react";

export default function ActivityListItemPlaceholder() {
  return (
    <Fragment>
      <Placeholder fluid style={{ marginTop: 25, marginBottom: 55 }}>
        <Segment.Group>
          <Segment style={{ minHeight: 115 }}>
            <Placeholder>
              <Placeholder.Header image>
                <Placeholder.Line />
                <Placeholder.Line />
              </Placeholder.Header>
              <Placeholder.Paragraph>
                <Placeholder.Line />
              </Placeholder.Paragraph>
            </Placeholder>
          </Segment>
          <Segment>
            <Placeholder>
              <Placeholder.Line />
              {/* <Placeholder.Line /> */}
            </Placeholder>
          </Segment>
          <Segment secondary style={{ minHeight: 70 }} />
          <Segment clearing>
            <Button disabled color="blue" floated="right" content="View" />
          </Segment>
        </Segment.Group>
      </Placeholder>
    </Fragment>
  );
}
