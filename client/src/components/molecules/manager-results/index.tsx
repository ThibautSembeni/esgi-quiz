export default function ResultManager({ results }) {
  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">
            Réponses
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            Résultats des participants en temps réel
          </p>
        </div>
      </div>
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr className="divide-x divide-gray-200">
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-4 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                  >
                    Utilisateur
                  </th>
                  {results?.questions?.map((question) => (
                    <th
                      key={question.index}
                      scope="col"
                      className="px-4 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Question {question.index}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {results?.users?.map((user) => (
                  <tr key={user.username} className="divide-x divide-gray-200">
                    <td className="whitespace-nowrap py-4 pl-4 pr-4 text-sm font-medium text-gray-900 sm:pl-0">
                      {user.username}
                    </td>
                    {results?.questions?.map((question) => (
                      <td
                        key={question.index}
                        className="whitespace-nowrap p-4 text-sm text-gray-500"
                      >
                        {user?.questions?.find(
                          (q) => q.index === question.index,
                        )?.is_correct === null
                          ? "🔄"
                          : user?.questions?.find(
                              (q) => q.index === question.index,
                            )?.is_correct
                          ? "✅"
                          : "❌"}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
