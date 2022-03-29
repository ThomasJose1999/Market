const console = require('console');

import { useState } from 'react'
import { ethers } from 'ethers'
import { useRouter } from 'next/router'
import Web3Modal from 'web3modal'

import { pinFileToIPFS, pinMetadataToIPFS } from '../scripts/uploadFile';

import {
  marketplaceAddress
} from '../config'

import NFTMarketplace from '../artifacts/contracts/NFTMarketplace.sol/NFTMarketplace.json'

export default function CreateItem() {
  const [fileUrl, setFileUrl] = useState(null)
  const [formInput, updateFormInput] = useState({ price: '', name: '', description: '' })
  const router = useRouter()

  async function onChange(e) {
    /* upload image to IPFS */
    const file = e.target.files[0]
    try {
      const url = await pinFileToIPFS(file);

      // const url = `https://ipfs.infura.io/ipfs/${added.path}`
      console.log(url, " fileURL")
      setFileUrl(url)
      console.log(url, " URL")

    } catch (error) {
      <inputs
        type="file"
        name="Asset"
        className="my-4"
        onChange={onChange}
      />
      console.log('Error uploading file: ', error)
    }
  }
  async function uploadToIPFS() {
    const { name, description, price } = formInput
    console.log(fileUrl, " fileurl")
    if (!name || !description || !price || !fileUrl) return
    /* first, upload metadata to IPFS */
    const data = {
      name: name,
      description: description,
      image: fileUrl
    }
    try {
      const url = await pinMetadataToIPFS(data);
      /* after metadata is uploaded to IPFS, return the URL to use it in the transaction */
      console.log(url)
      return url
    } catch (error) {
      console.log('Error uploading file: ', error)
    }
  }

  async function listNFTForSale() {
    const url = await uploadToIPFS()
    console.log(url, " hello");
    const web3Modal = new Web3Modal()
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner()

    /* create the NFT */
    const price = ethers.utils.parseUnits(formInput.price, 'ether')
    let contract = new ethers.Contract(marketplaceAddress, NFTMarketplace.abi, signer)
    let listingPrice = await contract.getListingPrice()
    //console.log(listingPrice)
    listingPrice = listingPrice.toString()
    console.log(listingPrice, "listing")
    console.log("++++++++++++++++++++++++++++++")
    let transaction = await contract.createToken(url, price, { value: listingPrice })
    await transaction.wait()

    router.push('/')
  }

  return (
    <div className="flex justify-center">
      <div className="w-1/2 flex flex-col pb-12">
        <input
          placeholder="Asset Name"
          className="mt-8 border rounded p-4"
          onChange={e => updateFormInput({ ...formInput, name: e.target.value })}
        />
        <textarea
          placeholder="Asset Description"
          className="mt-2 border rounded p-4"
          onChange={e => updateFormInput({ ...formInput, description: e.target.value })}
        />
        <input
          placeholder="Asset Price in Eth"
          className="mt-2 border rounded p-4"
          onChange={e => updateFormInput({ ...formInput, price: e.target.value })}
        />
        <input
          type="file"
          name="Asset"
          className="my-4"
          onChange={onChange}
        />
        {
          fileUrl && (
            <img className="rounded mt-4" width="350" src={fileUrl} />
          )
        }
        <button onClick={listNFTForSale} className="font-bold mt-4 bg-pink-500 text-white rounded p-4 shadow-lg">
          Create NFT
        </button>
      </div>
    </div>
  )
}