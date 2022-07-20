import { Typography } from "@mui/material";
import { AxiosResponse } from "axios";
import { toast } from "react-toastify";

export const ErrorPayoutHandlers = (
  response: AxiosResponse<any, any> | undefined
) => {
  const data = response?.data;
  console.log(response);
  if (data?.code) {
    switch (data?.code) {
      case "DATA_FORMAT":
        toast.error(
          <>
            <Typography variant="body1" fontWeight={600}>
              {data?.error}
            </Typography>

            <Typography variant="caption" fontWeight={500}>
              {data?.message?.error}
            </Typography>
            <br />
            <Typography variant="caption">
              ID: {data?.message?.game_id}
            </Typography>
          </>
        );
        break;
      case "HEADERS":
        toast.error(
          <>
            <Typography variant="body1" fontWeight={600}>
              {data?.error}
            </Typography>
            <Typography variant="caption">{data?.message}</Typography>
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
  }
};
