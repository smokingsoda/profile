import styles from './Poetry.module.css';

interface PoemCharProps {
  char: string;
}

export default function PoemChar({ char }: PoemCharProps) {
  return (
    <span className={styles.char} data-char>
      {char}
    </span>
  );
}
