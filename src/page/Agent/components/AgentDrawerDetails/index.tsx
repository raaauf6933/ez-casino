import {
  Box,
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
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import useStyles from "./style";
interface AgentDrawerDetailsProps extends useBulkActionsTypes {
  data?: any;
  open: boolean;
  onClose: () => void;
  agent: any;
  loading: boolean;
  onUpdateStatus: (newStatus: StatusType) => void;
  onChangeUpperAgent: () => void;
  onChangeGameId: () => void;
  onDeleteAgent: (newStatus: StatusType) => void;
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
    reset,
    onChangeGameId,
    onDeleteAgent
  } = props;
  const user = useUser();
  const loading = agentLoading || !agent;

  const classes = useStyles(props);
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
  console.log(agent);

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
          <>
            <Box display="flex" alignItems="flex-start">
              <Typography variant="h4" gutterBottom>
                Agent # {agent.game_code}
              </Typography>
              {user?.usertype === UserTypeEnum.CLUB_ADMIN ? (
                <>
                  <IconButton size="small" onClick={onChangeGameId}>
                    <ModeEditIcon />
                  </IconButton>
                  <IconButton
                    color="error"
                    size="small"
                    onClick={() => onDeleteAgent(StatusType.DELETED)}
                    disabled={!agent || agent?.sub_agents?.length > 0}
                  >
                    <DeleteIcon />
                  </IconButton>
                </>
              ) : null}
              {/* <Typography variant="caption" color="primary" gutterBottom>
                <sub>Change Game ID</sub>
              </Typography> */}
            </Box>
          </>
        )}
        <table className={classes.table}>
          <tbody>
            {!loading ? (
              <>
                <tr>
                  <th align="left">Username</th>
                  <td align="left">{agent?.username}</td>
                </tr>
                <tr>
                  <th align="left">First name</th>
                  <td align="left">{agent?.first_name}</td>
                </tr>
                <tr>
                  <th align="left">Last name</th>
                  <td align="left">{agent?.last_name}</td>
                </tr>
                <tr>
                  <th align="left">Added By</th>
                  <td align="left">{agent?.added_by?.name}</td>
                </tr>
                {user?.usertype === UserTypeEnum.AGENT ? null : (
                  <tr>
                    <th align="left">Commission Rate</th>
                    <td align="left">{agent?.comms_rate}%</td>
                  </tr>
                )}
              </>
            ) : (
              <>
                <Skeleton variant="text" />
                <Skeleton variant="text" />
                <Skeleton variant="text" />
                <Skeleton variant="text" />
              </>
            )}
          </tbody>
        </table>

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
