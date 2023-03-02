import { useState } from "react";

export default function Folder({ explorerData, handleInsertNode }) {
  const [expand, setExpand] = useState(false);
  const [showInput, setShowInput] = useState({
    visible: false,
    isFolder: null
  });

  const handleNewFolder = (e, status) => {
    e.stopPropagation();
    setExpand(true);
    setShowInput({
      visible: true,
      isFolder: status
    });
  };

  const onAddFolder = (e) => {
    if (e.keyCode === 13 && e.target.value) {
      handleInsertNode(explorerData.id, e.target.value, showInput.isFolder);
      setShowInput({ showInput, visible: false });
    }
  };
  if (explorerData.isFolder) {
    return (
      <div>
        <div className="folder" onClick={(e) => setExpand(!expand)}>
          <span>📁{explorerData.name} </span>

          <button onClick={(e) => handleNewFolder(e, true)}>Folder + </button>
          <button onClick={(e) => handleNewFolder(e, false)}>File+ </button>
        </div>

        <div style={{ paddingLeft: 25 }}>
          {showInput.visible && (
            <div className="inputContainer">
              <span>{showInput.isFolder ? "📁" : "📃"} </span>
              <input
                type="text"
                onBlur={(e) => setShowInput({ ...showInput, visible: false })}
                className="inputContainer__input"
                onKeyDown={onAddFolder}
                autoFocus
              />
            </div>
          )}
          {expand &&
            explorerData.items.map((item) => (
              <div key={item.id}>
                <span>
                  <Folder
                    handleInsertNode={handleInsertNode}
                    explorerData={item}
                  />
                </span>
              </div>
            ))}
        </div>
      </div>
    );
  } else {
    return <span>📃 {explorerData.name}</span>;
  }
}
