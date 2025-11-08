import React from "react";

const draw = {
  "Round of 32": [
    { p1: "A. Tabilo (1)", p2: "Bye", winner: 1 },
    { p1: "A. Walton", p2: "J. Borges", winner: 2 },
    { p1: "L. Klein", p2: "M. Galarneau", winner: 1 },
    { p1: "H. Grenier", p2: "T. Fabbiano", winner: 1 }
  ],
  "Round of 16": [
    { p1: "A. Tabilo (1)", p2: "J. Borges", winner: 1 },
    { p1: "L. Klein", p2: "H. Grenier", winner: 2 }
  ],
  Quarterfinals: [
    { p1: "A. Tabilo (1)", p2: "H. Grenier", winner: 1 }
  ],
  Semifinals: [
    { p1: "A. Tabilo (1)", p2: "M. Uchida", winner: 1 }
  ],
  Final: [
    { p1: "A. Tabilo (1)", p2: "J. Moro Canas", winner: 1 }
  ]
};

const classNames = (...classes) => classes.filter(Boolean).join(" ");

const DrawBracket = () => {
  const totalRounds = Object.keys(draw).length;
  const finalMatch = draw.Final[0];
  const championName = finalMatch.winner === 1 ? finalMatch.p1 : finalMatch.p2;

  const renderPlayerRow = (key, player, isWinner) => (
    <div
      key={key}
      className={classNames(
        "flex justify-between items-center text-sm px-3 py-1",
        isWinner ? "text-blue-600 font-semibold" : "text-gray-400"
      )}
    >
      <span className="truncate">{player}</span>
      {isWinner && <span className="ml-2 text-[10px] tracking-wide uppercase">W</span>}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 font-sans p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800">Athens Challenger - Singles Draw</h1>
        <p className="mt-2 text-sm text-gray-500">
          Follow the path to the title with an ATP-inspired draw layout.
        </p>

        <div className="mt-8 overflow-x-auto">
          <div className="flex gap-6 min-w-max pb-4">
            {Object.entries(draw).map(([round, matches], columnIndex) => (
              <div
                key={round}
                className={classNames(
                  "flex flex-col gap-4 min-w-[220px]",
                  columnIndex !== 0 && "pl-6 border-l border-gray-300"
                )}
              >
                <h3 className="text-center text-xs font-semibold uppercase tracking-wide text-gray-500">
                  {round}
                </h3>

                <div className="flex flex-col gap-4">
                  {matches.map((match, matchIndex) => {
                    const players = [
                      { name: match.p1, isWinner: match.winner === 1 },
                      { name: match.p2, isWinner: match.winner === 2 }
                    ];
                    const winningPlayer = players.find((player) => player.isWinner)?.name;
                    const isChampionMatch = winningPlayer === championName;

                    return (
                      <div
                        key={`${round}-${matchIndex}`}
                        className={classNames(
                          "relative border rounded-xl shadow-sm transition-colors duration-150",
                          "bg-white border-gray-200 hover:bg-blue-50",
                          "divide-y divide-gray-200",
                          isChampionMatch && "bg-blue-100 border-blue-500 shadow"
                        )}
                      >
                        {players.map(({ name, isWinner: winnerFlag }, playerIndex) =>
                          renderPlayerRow(
                            `${round}-${matchIndex}-player-${playerIndex}`,
                            name,
                            winnerFlag
                          )
                        )}

                        {columnIndex !== totalRounds - 1 && (
                          <span className="hidden md:block absolute -right-6 top-1/2 w-6 border-t border-gray-300" />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DrawBracket;
