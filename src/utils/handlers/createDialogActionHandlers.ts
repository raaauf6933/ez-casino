import { NavigateFunction } from "react-router-dom";

type Url<T extends Dialog<any>> = (params: T) => string;

export type Dialog<TDialog extends string> = Partial<{
  action: TDialog;
}>;

type CreateCloseModal<
  TAction extends string,
  TParams extends Dialog<TAction>
> = [
  (type: "drawer" | "dialog", action: TAction, newParams?: TParams) => void,
  () => void
];

function createDialogActionHandlers<
  TAction extends string,
  TParams extends Dialog<TAction>
  //   & BulkAction & SingleAction
>(
  navigate: NavigateFunction,
  url: Url<TParams>,
  params: TParams
): CreateCloseModal<TAction, TParams> {
  const close = () =>
    navigate(
      url({
        ...params,
        action: undefined,
        drawerAction: undefined,
        id: undefined,
        ids: undefined
      }),
      {
        replace: true
      }
    );
  const open = (
    type: "drawer" | "dialog",
    action: TAction,
    newParams?: TParams
  ) => {
    if (type === "dialog") {
      navigate(
        url({
          ...params,
          ...newParams,
          action
        })
      );
    } else {
      navigate(
        url({
          ...params,
          ...newParams,
          drawerAction: action
        })
      );
    }
    return;
  };

  return [open, close];
}

export default createDialogActionHandlers;
