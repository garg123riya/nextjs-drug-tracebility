import { useWeb3Contract, useMoralis } from "react-moralis"
import supplyChainAbi from "../constants/SupplyChain.json"
import networkMapping from "../constants/networkMapping.json"
import { useState } from "react"

export default function Pharmacy() {
    const { isWeb3Enabled, chainId, account } = useMoralis()
    const chainString = chainId ? parseInt(chainId).toString() : "31337"
    const supplyChainAddress = chainId ? networkMapping[chainString].SupplyChain[0] : null
    const { runContractFunction } = useWeb3Contract()
    console.log(account)

    const [drugId, setDrugId] = useState()

    async function receiveDrug(drugId) {
        event.preventDefault()
        const returnedProceeds = await runContractFunction({
            params: {
                abi: supplyChainAbi,
                contractAddress: supplyChainAddress,
                functionName: "receiveDrug",
                params: {
                    _drugId: drugId,
                },
            },
            onError: (error) => console.log(error),
        })
    }

    return (
        <div className="container mx-auto">
            <h1 className="py-4 px-4 font-bold text-2xl"></h1>
            <div className="flex flex-wrap">
                {isWeb3Enabled ? (
                    <div>
                        <div>
                            <form onSubmit={() => receiveDrug(drugId)}>
                                <input
                                    type="text"
                                    placeholder="Drug ID"
                                    value={drugId}
                                    onChange={(event) => setDrugId(event.target.value)}
                                />
                                <br>
                                </br>
                                <button class="btn">Recieve Drug</button>
                            </form>
                        </div>
                    </div>
                ) : (
                    <div>Web3 Currently Not Enabled</div>
                )}
            </div>
        </div>
    )
}
