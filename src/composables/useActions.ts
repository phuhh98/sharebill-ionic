import { ActionSheet, ActionSheetButtonStyle } from "@capacitor/action-sheet";

export const useActions = () => {
  enum ReceiptItemActionsEnum {
    Cancel = 3,
    Edit = 0,
    GoToShare = 1,
    Remove = 2,
  }

  enum ConfirmDeleteActionsEnum {
    Cancel = 1,
    Confirmed = 0,
  }

  const receiptItemActions = async (): Promise<ReceiptItemActionsEnum> => {
    const result = await ActionSheet.showActions({
      message: "Select an option to perform",
      options: [
        {
          title: "Edit",
        },
        {
          style: ActionSheetButtonStyle.Default,
          title: "Go to share",
        },
        {
          style: ActionSheetButtonStyle.Destructive,
          title: "Remove",
        },
        {
          style: ActionSheetButtonStyle.Cancel,
          title: "Cancel",
        },
      ],
      title: "Receipt item actions",
    });

    switch (result.index) {
      case ReceiptItemActionsEnum.Edit:
        return ReceiptItemActionsEnum.Edit;
      case ReceiptItemActionsEnum.GoToShare:
        return ReceiptItemActionsEnum.GoToShare;
      case ReceiptItemActionsEnum.Remove:
        return ReceiptItemActionsEnum.Remove;
      default:
        return ReceiptItemActionsEnum.Cancel;
    }
  };

  const confirmDeleteActions = async () => {
    const result = await ActionSheet.showActions({
      message: "Select an option to perform",
      options: [
        {
          title: "Delete",
        },
        {
          style: ActionSheetButtonStyle.Cancel,
          title: "Cancel",
        },
      ],
    });

    switch (result.index) {
      case ConfirmDeleteActionsEnum.Confirmed:
        return ConfirmDeleteActionsEnum.Confirmed;
      default:
        return ConfirmDeleteActionsEnum.Cancel;
    }
  };

  return {
    confirmDeleteActions,
    ConfirmDeleteActionsEnum,
    receiptItemActions,
    ReceiptItemActionsEnum,
  };
};
