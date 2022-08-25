import { Box, Button } from "@mui/material";
import Card from "components/Card";
import useStyles from "./styles";
import LoadingButton from "@mui/lab/LoadingButton";
import * as React from "react";

interface SaveButtonBarProps {
  onSave: () => void;
  onBack: () => void;
  hideSaveBtn?: boolean;
  labels?: {
    back?: string;
    save?: string;
  };
  loading: boolean;
  disabled?: boolean;
}

const SaveButtonBar: React.FC<SaveButtonBarProps> = props => {
  const { onSave, onBack, labels, hideSaveBtn, loading, disabled } = props;
  const classes = useStyles(props);
  // const SaveButtonBarEl = React.useRef<HTMLDivElement>(null);
  // const [scrollY, setScrollY] = React.useState(0);
  // const [positionUnset, setPositionUnset] = React.useState(false);

  // const handleScroll = () => {
  //   setScrollY(window.scrollY);
  // };

  // React.useEffect(() => {
  //   if (window.innerHeight + scrollY > document.body.offsetHeight) {
  //     setPositionUnset(true);
  //   } else {
  //     setPositionUnset(false);
  //   }

  //   window.addEventListener("scroll", handleScroll);
  //   console.log(scrollY);
  //   console.log(window.innerHeight + window.scrollY);
  //   console.log(document.body.clientHeight);

  //   // console.log(document.body.offsetHeight);
  //   // console.log(SaveButtonBarEl?.current?.offsetHeight);
  //   return () => window.removeEventListener("scroll", handleScroll);
  // });

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
                // <Button variant="contained" color="primary" onClick={onSave}>
                //   {labels?.save ? labels?.save : "Save"}
                // </Button>
                <LoadingButton
                  loading={loading}
                  // loadingPosition="start"
                  onClick={onSave}
                  variant="contained"
                  disabled={disabled}
                >
                  {labels?.save ? labels?.save : "Save"}
                </LoadingButton>
              )}
            </div>
          </Box>
        </Card>
      </div>
    </>
  );
};

export default SaveButtonBar;
