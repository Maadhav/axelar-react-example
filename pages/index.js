import useAxelar from "../hooks/useAxelar";
import styles from "../styles/Home.module.css";

function App() {
  const { execute } = useAxelar();
  return (
    <div className={styles.App}>
      <div className={styles["App-header"]}>
        <button className={styles.button} onClick={execute}> Execute</button>
      </div>
    </div>
  );
}

export default App;
