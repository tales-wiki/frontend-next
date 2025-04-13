export default function Runner() {
  const koreanConsonants = [
    "ㄱ",
    "ㄴ",
    "ㄷ",
    "ㄹ",
    "ㅁ",
    "ㅂ",
    "ㅅ",
    "ㅇ",
    "ㅈ",
    "ㅊ",
    "ㅋ",
    "ㅌ",
    "ㅍ",
    "ㅎ",
  ];

  const englishConsonants = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
  ];

  const numberConsonants = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-5">런너 사전</h1>
      <div className="flex flex-col gap-5">
        <div className="grid lg:grid-cols-6 grid-cols-3 gap-0.5">
          {koreanConsonants.map((consonant, index) => (
            <div
              key={index}
              className="flex items-center justify-center p-0.5 border bg-slate-600"
            >
              <span className="text-sm text-white">{consonant}</span>
            </div>
          ))}
        </div>
        <div className="grid lg:grid-cols-6 grid-cols-3 gap-0.5">
          {englishConsonants.map((consonant, index) => (
            <div
              key={index}
              className="flex items-center justify-center p-0.5 border bg-slate-600"
            >
              <span className="text-sm text-white">{consonant}</span>
            </div>
          ))}
        </div>
        <div className="grid lg:grid-cols-6 grid-cols-3 gap-0.5">
          {numberConsonants.map((consonant, index) => (
            <div
              key={index}
              className="flex items-center justify-center p-0.5 border bg-slate-600"
            >
              <span className="text-sm text-white">{consonant}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
