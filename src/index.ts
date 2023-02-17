import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { WalletLinkConnector } from "@web3-react/walletlink-connector";

interface IWalletConnector {
  type: "metamask" | "walletConnect" | "walletLink";
  supportedChainIds?: number[];
}

const walletConnector = ({ type, supportedChainIds }: IWalletConnector) => {
  let connector;

  switch (type) {
    case "metamask":
      connector = new InjectedConnector({ supportedChainIds });
      break;
    case "walletConnect":
      connector = new WalletConnectConnector({ supportedChainIds });
      break;
    case "walletLink":
      connector = new WalletLinkConnector({
        url: "",
        appName: "",
        supportedChainIds,
      });
      break;
    default:
      break;
  }
};
