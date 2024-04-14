import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Checkbox } from "../ui/checkbox";
import { CheckedState } from "@radix-ui/react-checkbox";

export type TalentDev = {
  candidateId: number;
  fullname: string;
  email: string;
  level: "Junior" | "Middle" | "Senior";
  salaryWanted: number;
  deal: number | null;
  status: "pending" | "requested" | "successed" | "failed";
};

export const TalentDevList: TalentDev[] = [
  {
    candidateId: 0,
    fullname: "hello",
    email: "ducminhsw01@gmail.com",
    level: "Junior",
    salaryWanted: 0,
    deal: 85,
    status: "pending",
  },
  {
    candidateId: 1,
    fullname: "hello",
    email: "ducminh-junior@gmail.com",
    level: "Junior",
    salaryWanted: 0,
    deal: 50,
    status: "pending",
  },
  {
    candidateId: 2,
    fullname: "hello",
    email: "ducminh-haitac@gmail.com",
    level: "Middle",
    salaryWanted: 0,
    deal: 65,
    status: "requested",
  },
];
const indexedTalentDevList = TalentDevList.map((dev, index) => ({
  ...dev,
  index: index + 1,
}));
const columnHelper = createColumnHelper<TalentDev & { index: number }>();
const defaultColumn = [
  columnHelper.accessor(
    (row) => {
      return row.index;
    },
    {
      id: "select",
      header: ({ table }) => (
        <div className="h-[32px] w-[32px] flex justify-center items-center">
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomeRowsSelected() && "indeterminate")
            }
            onCheckedChange={(checked: CheckedState) => {
              table.toggleAllPageRowsSelected(!!checked);
            }}
            aria-label="Select all"
          />
        </div>
      ),
      cell: ({ row }) => (
        <div className="h-[32px] w-[32px] flex justify-center items-center">
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
          />
        </div>
      ),
      enableSorting: false,
      enableHiding: false,
    }
  ),
  columnHelper.accessor(
    (row) => {
      return row.index;
    },
    {
      id: "candidateId",
      header: () => <div className="text-center">{"Index"}</div>,
      cell: ({ row }) => (
        <div className="text-center">{row.getValue("candidateId")}</div>
      ),
    }
  ),
  columnHelper.accessor(
    (row) => {
      return row.fullname;
    },
    {
      id: "fullname",
      header: "Name",
      cell: (fullname) => (
        <div className="w-[120px]">{fullname.getValue()}</div>
      ),
    }
  ),
  columnHelper.accessor(
    (row) => {
      return row.email;
    },
    {
      id: "email",
      header: "Email",
      cell: (email) => <div className="w-[210px]">{email.getValue()}</div>,
    }
  ),
];

export default function BasicTable() {
  const table = useReactTable({
    columns: defaultColumn,
    data: indexedTalentDevList,
    getCoreRowModel: getCoreRowModel(),
    initialState: {
      columnOrder: ["candidateId", "fullname", "email", "select"],
      expanded: true,
      sorting: [
        {
          id: "candidateId",
          desc: true,
        },
      ],
    },
  });

  return (
    <div className="w-[600px] rounded-md border text-sm">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={defaultColumn.length}
                className="h-24 text-center"
              >
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
