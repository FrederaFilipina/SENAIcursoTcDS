import styles from './Footer.module.css'

export function Footer({autor}) {
  return (
    <footer className={styles.footer}>
      <p>Desenvolvido por: {autor}</p>
    </footer>
  )
}