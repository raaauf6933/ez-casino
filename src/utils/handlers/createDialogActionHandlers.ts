import { NavigateFunction } from "react-router-dom";

type Url<T extends Dialog<any>> = (params: T) => string;

export type Dialog<TDialog extends string> = Partial<{
  action: TDialog;
}>;

type CreateCloseModal<
  TAction extends string,
  TParams extends Dialog<TAction>
> = [(action: TAction, newParams?: TParams) => void, () => void];

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
        id: undefined,
        ids: undefined
      }),
      {
        replace: true
      }
    );
  const open = (action: TAction, newParams?: TParams) =>
    navigate(
      url({
        ...params,
        ...newParams,
        action
      })
    );

  return [open, close];
}

export default createDialogActionHandlers;
