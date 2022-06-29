import { Box, Grid, TextField, Typography, Skeleton } from "@mui/material";
import Drawer from "components/Drawer";
import * as React from "react";

interface AgentDrawerDetailsProps {
  data?: any;
  open: boolean;
  onClose: () => void;
  agent: any;
  loading: boolean;
}

const AgentDrawerDetails: React.FC<AgentDrawerDetailsProps> = props => {
  const { open, onClose, agent, loading: agentLoading } = props;

  const loading = agentLoading || !agent;
  return (
    <Drawer open={open} onClose={onClose}>
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
                value={agent?.first_name}
                size="small"
                label="First Name"
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
      </Box>
    </Drawer>
  );
};

export default AgentDrawerDetails;