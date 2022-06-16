import { Box, Button } from "@mui/material";
import Card from "components/Card";
import useStyles from "./styles";
import * as React from "react";

interface SaveButtonBarProps {
  onSave: () => void;
  onBack: () => void;
  hideSaveBtn?: boolean;
  labels?: {
    back: string;
    save: string;
  };
}

const SaveButtonBar: React.FC<SaveButtonBarProps> = props => {
  const { onSave, onBack, labels, hideSaveBtn } = props;
  const classes = useStyles(props);

  return (
    <>
      <div className={classes.root}>
        <Card>
          <Box display="flex" justifyContent="space-between">
            <div>
              <Button variant="outlined" color="info" onClick={onBack}>
                {labels?.back ? labels?.back : "Back"}
              </Button>
            </div>

            <div>
              {hideSaveBtn ? null : (
                <Button variant="contained" color="primary" onClick={onSave}>
                  {labels?.save ? labels?.save : "Save"}
                </Button>
              )}
            </div>
          </Box>
        </Card>
      </div>
    </>
  );
};

export default SaveButtonBar;
