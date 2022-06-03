import styles from "./Table.module.css";

const Table = ({ className, data, column }) => {
  let tableClassName = styles.table;
  if (className) {
    tableClassName = `${tableClassName} ${className}`;
  }

  const rows = [...new Array(data.length)].map((item, index) => {
    return column.map(({ columnId }) => data[index][columnId]);
  });
  return (
    <table className={tableClassName}>
      <thead>
        <tr>
          {column.map(({ columnId, Header }) => {
            return <td key={columnId}>{Header}</td>;
          })}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, index) => {
          return (
            <tr key={index}>
              {row.map((cell, index) => {
                return <td key={index}>{cell}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;
