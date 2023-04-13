import { Dispatch, SetStateAction } from "react"
import { StyledEditAdvertModal } from "./style"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { api } from "@/src/services/api";
import { toast } from "react-toastify";
import {  useState } from "react";
import { DeleteAdvertModal } from "../Delete Advert";
import { Body_2_500, Heading_7_500, Input_label } from "@/src/styles/global";
import { StyledButtonClose, StyledButtonImg, StyledDivButtons, StyledInput } from "../Create Advert/style";

export interface iEditAdvertModalProps {
  setIsEditAdvertModal: Dispatch<SetStateAction<boolean>>
  advert: iAdvert
}

export interface iAdvert {
  id: string;
	brand: string;
	banner: string;
	model: string;
	year: string;
	fuel: string;
	mileage: number;
	color: string;
	price: string;
	description: string;
	is_bargain: boolean;
	is_published: boolean;
	created_at: string;
	updated_at: string;
}

export interface iEditAdvert {
	brand?: string;
	banner?: string;
	model?: string;
	year?: string;
	fuel?: string;
	mileage?: string;
	color?: string;
	price?: string;
	description?: string;
	is_bargain?: boolean;
	is_published?: boolean;
  fipe?: string;
  firstImage?: string;
  secondImage?: string;
  images?: string[]
}

const schemaEditAdvert = yup.object({
  brand: yup.string().notRequired(),
  model: yup.string().notRequired(),
  year: yup.string().notRequired(),
  fuel: yup.string().notRequired(),
  mileage: yup.string().notRequired(),
  color: yup.string().notRequired(),
  fipe: yup.string().notRequired(),
  price: yup.string().notRequired(),
  description: yup.string().notRequired(),
  banner: yup.string().notRequired(),
  firstImage: yup.string().notRequired(),
  secondImage: yup.string().notRequired()
});

export const EditAdvertModal = ({setIsEditAdvertModal, advert}: iEditAdvertModalProps) => {
  const [isPublished, setIsPublished] = useState<boolean>(advert.is_published)
  const [isDeleteModal, setIsDeleteModal] = useState<boolean>(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<iEditAdvert>({
    resolver: yupResolver(schemaEditAdvert),
  });

  const handleSubmitFunction = async (data: iEditAdvert) => {
    if (advert.is_published !== isPublished) {
      data.is_published = isPublished
    }
    if (data.brand === "") {
      delete data.brand
    }
    if (data.model === "") {
      delete data.model
    }
    if (data.year === "") {
      delete data.year
    }
    if (data.fuel === "") {
      delete data.fuel
    }
    if (data.mileage === "") {
      delete data.mileage
    }
    if (data.color === "") {
      delete data.color
    }
    if (data.price === "") {
      delete data.price
    }
    if (data.description === "") {
      delete data.description
    }
    if (data.fipe === "") {
      delete data.fipe
    }
    if (data.banner === "") {
      delete data.banner
    }
    if (data.firstImage === "") {
      delete data.firstImage
    }
    if (data.secondImage === "") {
      delete data.secondImage
    }
    if (data.firstImage || data.secondImage) {
      data.images = []
      if (data.firstImage) {
        data.images.push(data.firstImage)
        delete data.firstImage
      }
      if (data.secondImage) {
        data.images.push(data.secondImage)
        delete data.secondImage
      }
    }
    try {
      await api.patch(`/api/anoucements/${advert.id}`, data);
      toast.success("Anúncio alterado com sucesso", {
        theme: "dark",
      });
      setIsEditAdvertModal(false)
    } catch (err) {
      console.log(err)
      toast.error("Não foi possível alterar o anúncio", {
        theme: "dark",
      })
    }
  }

  return (
    <>
      <StyledEditAdvertModal>
        {
          isDeleteModal ? (
            <DeleteAdvertModal setIsDeleteModal={setIsDeleteModal} advertId={advert.id} setIsEditAdvertModal={setIsEditAdvertModal}/>
          ) : null
        }
        <div className="modal">
          <div className="head">
            <Heading_7_500>Editar anúncio</Heading_7_500>
            <StyledButtonClose onClick={() => setIsEditAdvertModal(false)}>X</StyledButtonClose>
          </div>
          <form onSubmit={handleSubmit(handleSubmitFunction)}>
            <Body_2_500>Informações do veículo</Body_2_500>

            <div className="formSingleInput">
              <Input_label>Marca</Input_label>
              <StyledInput type="text" id="brand" placeholder="Mercedes Benz" {...register("brand")}/>

              <Input_label>Modelo</Input_label>
              <StyledInput type="text" id="model" placeholder="A 200 CGI ADVANCE SEDAN" {...register("model")}/>

            </div>
            <div className="formDoubleInput">
              <div className="containerInput">
                <Input_label>Ano</Input_label>
                <StyledInput type="text" id="year" placeholder="2018" {...register("year")}/>
              </div>

              <div className="containerInput">
                <Input_label>Combustível</Input_label>
                <StyledInput type="text" id="fuel" placeholder="Gasolina/Etanol" {...register("fuel")}/>
              </div>

              <div className="containerInput">
                <Input_label>Quilometragem</Input_label>
                <StyledInput type="text" id="mileage" placeholder="30.000" {...register("mileage")}/>
              </div>

              <div className="containerInput">
                <Input_label>Cor</Input_label>
                <StyledInput type="text" id="color" placeholder="Branco" {...register("color")}/>
              </div>

              <div className="containerInput">
                <Input_label>Preço tabela FIPE</Input_label>
                <StyledInput type="text" id="fipe" placeholder="R$ 48.000,00" {...register("fipe")}/>
              </div>

              <div className="containerInput">
                <Input_label>Preço</Input_label>
                <StyledInput type="text" id="price" placeholder="R$ 50.000,00" {...register("price")}/>
              </div>
            </div>
            <div className="formSingleInput">
              <Input_label>Descrição</Input_label>
              <StyledInput type="text" id="description" placeholder="Descrição do anúncio" {...register("description")}/>
              
              <Input_label>Publicado</Input_label>
              <StyledDivButtons>
                <button className="cancel" type="button" onClick={() => setIsPublished(true)}>SIM</button>
                <button className="confirm" type="button" onClick={() => setIsPublished(false)}>NÃO</button>
              </StyledDivButtons>
              <Input_label>Imagem da Capa</Input_label>
              <StyledInput type="text" id="banner" placeholder="https://image.com" {...register("banner")}/>

              <Input_label>1º Imagem da galeria</Input_label>
              <StyledInput type="text" id="firstImage" placeholder="https://image.com" {...register("firstImage")}/>

              <Input_label>2º Imagem da galeria</Input_label>
              <StyledInput type="text" id="secondImage" placeholder="https://image.com" {...register("secondImage")}/>

              <StyledButtonImg type="button">Adicionar campo para imagem da galeria</StyledButtonImg>

              <StyledDivButtons>
                <button className="cancel" type="button" onClick={() => setIsDeleteModal(true)}>Excluir anúncio</button>
                <button className="confirm" type="submit">Salvar alterações</button>
              </StyledDivButtons>
            </div>
          </form>
        </div>
      </StyledEditAdvertModal>
    </>
  )
}