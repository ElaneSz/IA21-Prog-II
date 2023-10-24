import {useEffect, useState, FormEvent} from 'react'
import styles from "./home.module.css"
import { HiMiniMagnifyingGlass } from "react-icons/hi2";
import { Link, useNavigate } from "react-router-dom";


//https://sujeitoprogramador.com/api-cripto/?key=1baec9913232b6ad

interface CoinProps {
    name: String;
    delta_24h: String;
    price: String;
    symbol: String;
    volume_24h: String;
    marke_cap: String;
    formatedPrice: String;
    formatedMarket: String
}

export function Home (){

    const [ coins, setCoins ] = useState<CoinProps[]>([])
    const [ inputValue, setInputValue ] = useState("")
    const navigate = useNavigate()

    useEffect(()=>{
        async function getData() {
            fetch('https://sujeitoprogramador.com/api-cripto/?key=1baec9913232b6ad&pref=BRL') // Rota para utilizar a API
            .then(response => response.json())
            .then((data)=>{
                let coinsData = data.coins.slice(0,15);
                let price = Intl.NumberFormat ("pt-BR", {
                    style: "currency",
                    currency: "BRL"
                })
                const FormatResult = coinsData.map((item) => {
                    const formated = {
                        ...item,
                        formatedPrice: price.format(Number(item.price)),
                        formatedMarket: price.format(Number(item.market_cap))
                    }
                    return formated;
                })
                setCoins(FormatResult)
            })
        }

        getData();
    },[])

    function pesquisa (e: FormEvent) {
        e.preventDefault();
        if (inputValue === "") return
        navigate(`/datail/${inputValue}`)
    }


    return(
        <main className={styles.container}>
            <form className={styles.form} onSubmit={pesquisa}>
                <input 
                placeholder="Digite o simbolo da moeda: BTC.."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                />
                <button type="submit">
                <HiMiniMagnifyingGlass size={30} color="#fff"/>
                </button>

            </form>

            <table>

                <thead>
                    <tr>

                        <th scope="col">Moedas</th>
                        <th scope="col">Valor Mercado</th>
                        <th scope="col">Preço</th>
                        <th scope="col">Volume</th>

                    </tr>

                </thead>

                <tbody id="tbody">
                    {coins.map(coin => (
                    <tr key={coin.name} className={styles.tr}>
                        <td className={styles.tdLabel} data-label="Moeda">
                            <Link  className={styles.link} to={`/detail/${coin.symbol}`}>
                                <span>{coin.name}</span> | {coin.symbol}
                            </Link>
                        </td>
                        <td className={styles.tdLabel} data-label="Mercado">
                            {coin.formatedMarket}
                        </td>
                        <td className={styles.tdLabel} data-label="Preço">
                            {coin.formatedPrice}
                        </td>
                        <td className={Number(coin?.delta_24h) >= 0? styles.tdProfit : styles.tdLoss} 
                            data-label="delta_24h"> {/*Muda a cor de acordo com o valor*/}
                            <span>{coin.delta_24h}</span>
                        </td>
                    </tr>
                    ))}

                </tbody>

            </table>


        </main>
    )
}