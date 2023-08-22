import styles from "./page.module.css";
import Eeethers_SVG from "./components/eeethers_svg";
import Mint from "./components/mint";
import Link from "next/link";

export default function Home() {
  const random_address = `0x${[...Array(40)].map(() => Math.floor(Math.random() * 16).toString(16)).join(``)}`;
  const random_seed = 1 + Math.floor(Math.random() * 9999);

  return (
    <main className={styles.main}>
      <div>
        <Eeethers_SVG random_address={random_address} random_seed={random_seed} />
      </div>
      <div>
        <h1>Eeethers</h1>
        <p>This is an exploration of onchain identity on the Optimism L2.</p>
        <p>
          Each is unique to its minter — we create seven unique colors from the <code>42</code> hexadecimal digits of
          your Ethereum address, and use them in an animated fully onchain SVG.
        </p>

        <p>
          <Link href={`${process.env.NEXT_PUBLIC_ETHERSCAN_URL}/address/${process.env.NEXT_PUBLIC_CONTRACT_ADDRESS}`}>
            Etherscan
          </Link>{" "}
          |{" "}
          <Link href={`${process.env.NEXT_PUBLIC_MARKETPLACE}/${process.env.NEXT_PUBLIC_CONTRACT_ADDRESS}`}>
            Opensea
          </Link>
        </p>
        <Mint />
      </div>
    </main>
  );
}
