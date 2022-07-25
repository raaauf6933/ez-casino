import { Node } from "../types";
import useListActions from "./useListActions";

export interface useBulkActionsTypes {
  add: (data: string) => void;
  isSelected: (data: string) => boolean;
  listElements?: string[];
  remove: (data: string) => void;
  reset: () => void;
  toggle: (data: string) => void;
  toggleAll: (items?: Node[], selected?: number, limit?: number) => void;
}

function useBulkActions(initial: string[] = []) {
  const { add, isSelected, listElements, remove, reset, set, toggle } =
    useListActions<string>(initial);

  function toggleAll(items?: Node[], selected?: number, limit?: number) {
    const allItems = items
      ?.slice(0, limit || items?.length)
      .map(item => item.id);
    reset();
    if (selected !== allItems?.length) {
      set(allItems ? allItems : []);
    }
  }

  return {
    add,
    isSelected,
    listElements,
    remove,
    reset,
    toggle,
    toggleAll
  };
}
export default useBulkActions;
