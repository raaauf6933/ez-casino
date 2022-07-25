import {
  Box,
  Grid,
  TextField,
  Typography,
  Skeleton,
  Button,
  IconButton,
  Tooltip
} from "@mui/material";
import Drawer from "components/Drawer";
import Table from "components/Table";
import { useUser } from "context/auth/context";
import { parseSubAgentList, subAgentTableColumns } from "page/Agent/utils";
import * as React from "react";
import { StatusType, UserTypeEnum } from "types";
import MoveUpIcon from "@mui/icons-material/MoveUp";
import { useBulkActionsTypes } from "hooks/useBulkActions";

interface AgentDrawerDetailsProps extends useBulkActionsTypes {
  data?: any;
  open: boolean;
  onClose: () => void;
  agent: any;
  loading: boolean;
  onUpdateStatus: (newStatus: StatusType) => void;
  onChangeUpperAgent: () => void;
}

const AgentDrawerDetails: React.FC<AgentDrawerDetailsProps> = props => {
  const {
    open,
    onClose,
    agent,
    loading: agentLoading,
    onUpdateStatus,
    onChangeUpperAgent,
    isSelected,
    listElements,
    toggle,
    toggleAll,
    reset
  } = props;
  const user = useUser();
  const loading = agentLoading || !agent;

  const displayActionArea = () => {
    if (
      user?.usertype === UserTypeEnum.CLUB_ADMIN &&
      agent?.status === StatusType.FOR_APPROVAL
    ) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <Drawer
      open={open}
      onClose={() => {
        reset();
        onClose();
      }}
      sx={{
        "& .MuiDrawer-paper": {
          maxWidth: "414px"
          // width: "414px"
        }
      }}
    >
      <Box padding={5}>
        {loading ? (
          <Skeleton variant="text" />
        ) : (
          <Typography variant="h4" gutterBottom>
            Agent # {agent.game_code}
          </Typography>
        )}
        <Grid
          container
          rowSpacing={2}
          sx={{
            display: "block"
          }}
        >
          <Grid item xs={12} sm={12} md={12} lg={12}>
            {loading ? (
              <Skeleton variant="text" height={30} />
            ) : (
              <TextField
                fullWidth
                value={agent?.username}
                size="small"
                label="Username"
                disabled
              />
            )}
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            {loading ? (
              <Skeleton variant="text" height={30} />
            ) : (
              <TextField
                fullWidth
                value={agent?.first_name}
                size="small"
                label="First Name"
                disabled
              />
            )}
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            {loading ? (
              <Skeleton />
            ) : (
              <TextField
                fullWidth
                value={agent?.last_name}
                size="small"
                label="Last Name"
                disabled
              />
            )}
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <TextField
              fullWidth
              size="small"
              label="Added by"
              value={agent?.added_by?.name}
              InputProps={{
                readOnly: true
              }}
              InputLabelProps={{
                shrink: true
              }}
              disabled
            />
          </Grid>
        </Grid>
        <Box marginTop={5}>
          <Typography variant="h4">Sub-Agents</Typography>
          <Table
            // minWidth={414}
            toolbar={
              <>
                <Tooltip title="Change Upper Agent">
                  <IconButton
                    color="primary"
                    aria-label="change upline agent"
                    component="label"
                    onClick={onChangeUpperAgent}
                  >
                    <MoveUpIcon />
                  </IconButton>
                </Tooltip>
              </>
            }
            selected={listElements}
            toggleAll={
              user?.usertype === UserTypeEnum.CLUB_ADMIN ? toggleAll : undefined
            }
            columns={subAgentTableColumns(user?.usertype)}
            data={parseSubAgentList(agent?.sub_agents, isSelected, toggle)}
            loading={false}
          />
        </Box>
      </Box>
      {displayActionArea() ? (
        <Box padding={3} display="flex" flexDirection="column">
          <Button
            fullWidth
            variant="contained"
            sx={{
              marginBottom: 1.5
            }}
            onClick={() => onUpdateStatus(StatusType.ACTIVE)}
          >
            APPROVE
          </Button>
          <Button
            fullWidth
            variant="outlined"
            color="error"
            onClick={() => onUpdateStatus(StatusType.REJECT)}
          >
            Reject
          </Button>
        </Box>
      ) : null}
    </Drawer>
  );
};

export default AgentDrawerDetails;
