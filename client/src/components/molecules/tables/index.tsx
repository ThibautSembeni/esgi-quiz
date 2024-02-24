import StripedRows from "@/components/molecules/tables/striped-rows";

export interface TableProps {
  type?: "striped rows";
  headersColumns: string[];
  bodyRows: (string | number)[][];
  title?: string;
  description?: string;
  addingButton?: boolean;
  addingButtonLabel?: string;
  editButton?: boolean;
  editButtonLabel?: string;
  addingLink?: string;
  editLink?: string;
  additionalButton?: boolean;
  additionalButtonLabel?: string;
  additionalButtonClickEvent?: (item: any) => void;
}
export default function Table({
  type,
  headersColumns = [],
  bodyRows = [],
  title,
  description,
  addingButton,
  addingButtonLabel,
  editButton,
  editButtonLabel,
  addingLink,
  editLink,
  additionalButton,
  additionalButtonLabel,
  additionalButtonClickEvent,
}: TableProps) {
  if (type === "striped rows") {
    return (
      <StripedRows
        headersColumns={headersColumns}
        bodyRows={bodyRows}
        title={title}
        description={description}
        addingButton={addingButton}
        addingButtonLabel={addingButtonLabel}
        editButton={editButton}
        editButtonLabel={editButtonLabel}
        addingLink={addingLink}
        editLink={editLink}
        additionalButton={additionalButton}
        additionalButtonLabel={additionalButtonLabel}
        additionalButtonClickEvent={additionalButtonClickEvent}
      />
    );
  }
}
