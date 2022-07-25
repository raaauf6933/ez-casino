import { Typography } from "@mui/material";
import { AxiosResponse } from "axios";
import { toast } from "react-toastify";

export const ErrorChangeUpperAgentHandler = (
  response: AxiosResponse<any, any> | undefined
) => {
  const data = response?.data;

  if (data?.code) {
    switch (data?.code) {
      case "INVALID_AGENT":
        toast.error(
          <>
            <Typography variant="body1" fontWeight={600}>
              {data?.error}
            </Typography>
            <Typography variant="caption">
              ID: {data?.message.game_id} <br /> Name: {data?.message.name}
            </Typography>
          </>
        );
        break;
      default:
        toast.error(
          <>
            <Typography variant="body1" fontWeight={600}>
              {data?.error}
            </Typography>
            <Typography variant="caption">{data?.message}</Typography>
          </>
        );
        break;
    }
  } else {
    toast.error(
      <>
        <Typography variant="caption">{data?.message}</Typography>
      </>
    );
  }
};
