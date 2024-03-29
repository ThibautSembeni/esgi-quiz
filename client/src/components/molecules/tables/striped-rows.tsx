import { TableProps } from "@/components/molecules/tables/index";
import Link from "next/link";

export default function StripedRows({
  headersColumns,
  bodyRows,
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
  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          {title && (
            <h1 className="text-base font-semibold leading-6 text-gray-900">
              {title}
            </h1>
          )}
          {description && (
            <p className="mt-2 text-sm text-gray-700">{description}</p>
          )}
        </div>
        {addingButton && (
          <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
            <Link
              href={addingLink}
              className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              {addingButtonLabel}
            </Link>
          </div>
        )}
      </div>
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  {headersColumns.map((value, index) => {
                    if (index === 0) {
                      return (
                        <th
                          key={index}
                          scope="col"
                          className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-3"
                        >
                          {value}
                        </th>
                      );
                    } else {
                      return (
                        <th
                          key={index}
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          {value}
                        </th>
                      );
                    }
                  })}

                  {editButton && (
                    <th
                      scope="col"
                      className="relative py-3.5 pl-3 pr-4 sm:pr-3"
                    >
                      <span className="sr-only">{editButtonLabel}</span>
                    </th>
                  )}
                </tr>
              </thead>
              <tbody className="bg-white">
                {bodyRows.length > 0 ? (
                  bodyRows.map((value, index) => (
                    <tr key={index} className="even:bg-gray-50">
                      {value.map((v, i) => {
                        if (i === 0) {
                          return (
                            <td
                              key={i}
                              className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3"
                            >
                              {v}
                            </td>
                          );
                        } else {
                          return (
                            <td
                              key={i}
                              className="whitespace-nowrap px-3 py-4 text-sm text-gray-500"
                            >
                              {v}
                            </td>
                          );
                        }
                      })}
                      {editButton && (
                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-3">
                          <Link
                            href={editLink}
                            className="text-indigo-600 hover:text-indigo-900"
                          >
                            {editButtonLabel}
                          </Link>
                        </td>
                      )}
                      {additionalButton && (
                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-3">
                          <button
                            type="button"
                            className="text-indigo-600 hover:text-indigo-900"
                            onClick={() => additionalButtonClickEvent(index)}
                          >
                            {additionalButtonLabel}
                          </button>
                        </td>
                      )}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={headersColumns.length + 1}
                      className="text-center py-4 text-sm text-gray-500"
                    >
                      No data available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
