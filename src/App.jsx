import { useState } from "react";
import "./App.css";
import { generate, count } from "random-words";

const data = [
  { title: "First", id: 0, checked: false },
  { title: "Second", id: 1, checked: false },
  { title: "Third", id: 2, checked: false },
  { title: "Fourth", id: 3, checked: false },
];

function App() {
  const [leftPanel, setLeftPanel] = useState([...data]);
  const [rightPanel, setRightPanel] = useState([]);

  const handleAddMore = () => {
    setLeftPanel((prev) => [
      ...prev,
      {
        title: generate({ minLength: 4, maxLength: 9 }),
        id: (leftPanel || []).length + (rightPanel || []).length - 1,
        checked: false,
      },
    ]);
  };

  const handleRightClick = () => {
    const unCheckedItems = leftPanel?.filter((item) => !item?.checked);
    setRightPanel((prev) => [
      ...prev,
      ...(leftPanel?.reduce((acc, item) => {
        if (item?.checked) return [...acc, { ...item, checked: false }];
        else return acc;
      }, []) || []),
    ]);
    setLeftPanel([...unCheckedItems]);
  };

  const handleLeftClick = () => {
    const unCheckedItems = rightPanel?.filter((item) => !item?.checked);
    setLeftPanel((prev) => [
      ...prev,
      ...(rightPanel?.reduce((acc, item) => {
        if (item?.checked) return [...acc, { ...item, checked: false }];
        else return acc;
      }, []) || []),
    ]);
    setRightPanel([...unCheckedItems]);
  };

  const handleClick = (index, checked, callback, data) => {
    if (index === 0) {
      callback((prev) => [
        { ...prev[0], checked: checked },
        ...(prev.slice(1) || []),
      ]);
    } else if (index === data.length - 1) {
      callback((prev) => [
        ...(prev.slice(0, index) || []),
        { ...prev[index], checked: checked },
      ]);
    } else {
      callback((prev) => [
        ...(prev.slice(0, index) || []),
        { ...prev[index], checked: checked },
        ...(prev.slice(index + 1) || []),
      ]);
    }
  };

  return (
    <div className="app__wrapper">
      <div className="app__panel">
        {leftPanel?.map((item, i) => {
          return (
            <div
              key={`left-item-${i}`}
              className={item?.checked ? "app__item-highlighted" : ""}
              onClick={() => {
                handleClick(i, !item?.checked, setLeftPanel, leftPanel);
              }}
            >
              {item.title}
            </div>
          );
        })}
      </div>
      <div className="app__action-btn">
        <button onClick={handleRightClick}>&#8594;</button>
        <button onClick={handleLeftClick}>&#8592;</button>
        <button onClick={handleAddMore}>Add more</button>
      </div>
      <div className="app__panel">
        {rightPanel?.map((item, i) => {
          return (
            <div
              key={`right-item-${i}`}
              className={item?.checked ? "app__item-highlighted" : ""}
              onClick={() => {
                handleClick(i, !item?.checked, setRightPanel, rightPanel);
              }}
            >
              {item.title}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
