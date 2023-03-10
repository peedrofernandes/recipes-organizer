import useTheme from "@infra/ui/hooks/useTheme"
import React, { Suspense } from "react"
import { DefaultIconProps } from "."

const AddRecipeIcon = React.lazy(() => import("../AddRecipeIcon"))
const AutomationIcon = React.lazy(() => import("../AutomationIcon"))
const CheckEmptyIcon = React.lazy(() => import("../CheckEmptyIcon"))
const CheckIcon = React.lazy(() => import("../CheckIcon"))
const CloseIcon = React.lazy(() => import("../CloseIcon"))
const CollectionIcon = React.lazy(() => import("../CollectionIcon"))
const DarkModeIcon = React.lazy(() => import("../DarkModeIcon"))
const DeleteIcon = React.lazy(() => import("../DeleteIcon"))
const DocumentIcon = React.lazy(() => import("../DocumentIcon"))
const DownloadIcon = React.lazy(() => import("../DownloadIcon"))
const EditIcon = React.lazy(() => import("../EditIcon"))
const HelpIcon = React.lazy(() => import("../HelpIcon"))
const InfoIcon = React.lazy(() => import("../InfoIcon"))
const IngredientIcon = React.lazy(() => import("../IngredientIcon"))
const LightModeIcon = React.lazy(() => import("../LightModeIcon"))
const LoadIcon = React.lazy(() => import("../LoadIcon"))
const MenuBookIcon = React.lazy(() => import("../MenuBookIcon"))
const MenuIcon = React.lazy(() => import("../MenuIcon"))
const NoRecipeIcon = React.lazy(() => import("../NoRecipeIcon"))
const PlusIcon = React.lazy(() => import("../PlusIcon"))
const SaveIcon = React.lazy(() => import("../SaveIcon"))
const SearchIcon = React.lazy(() => import("../SearchIcon"))
const SpinnerIcon = React.lazy(() => import("../SpinnerIcon"))

export type IconProps = {
  variant: "Delete" | "Edit" | "NoRecipe" | "NoImage" | "AddRecipe" | "Plus" | "DarkMode" | "LightMode" | "Help" | "Menu Book" | "Ingredient" | "Close" | "Search" | "Spinner" | "Check" | "CheckEmpty" | "Download" | "Document" | "Save" | "Load" | "Menu" | "Info" | "Collection" | "Automation"; 
  size?: number;
  color?: string;
}

export function Icon(props: IconProps) {
  const { theme } = useTheme()
  const defaultProps: DefaultIconProps = {
    color: props.color ?? theme.main.contrastV1,
    size: props.size
  }

  let result: JSX.Element
  switch (props.variant) {
  case "Delete":
    result = <DeleteIcon {...defaultProps} />
    break
  case "Edit":
    result = <EditIcon {...defaultProps} />
    break
  case "NoRecipe":
    result = <NoRecipeIcon {...defaultProps} />
    break
  case "AddRecipe":
    result = <AddRecipeIcon {...defaultProps} />
    break
  case "Plus":
    result = <PlusIcon {...defaultProps} />
    break
  case "DarkMode":
    result = <DarkModeIcon {...defaultProps} />
    break
  case "LightMode":
    result = <LightModeIcon {...defaultProps} />
    break
  case "Help":
    result = <HelpIcon {...defaultProps} />
    break
  case "Menu Book":
    result = <MenuBookIcon {...defaultProps} />
    break
  case "Ingredient":
    result = <IngredientIcon {...defaultProps }/>
    break
  case "Close":
    result = <CloseIcon {...defaultProps} />
    break
  case "Search":
    result = <SearchIcon {...defaultProps} />
    break
  case "Spinner":
    result = <SpinnerIcon {...defaultProps} />
    break
  case "Check":
    result = <CheckIcon {...defaultProps} />
    break
  case "CheckEmpty":
    result = <CheckEmptyIcon {...defaultProps} />
    break
  case "Download":
    result = <DownloadIcon {...defaultProps} />
    break
  case "Document":
    result = <DocumentIcon {...defaultProps} />
    break
  case "Save":
    result = <SaveIcon {...defaultProps} />
    break
  case "Load":
    result = <LoadIcon {...defaultProps} />
    break
  case "Menu":
    result = <MenuIcon {...defaultProps} />
    break
  case "Info":
    result = <InfoIcon {...defaultProps} />
    break
  case "Collection":
    result = <CollectionIcon {...defaultProps} />
    break
  case "Automation":
    result = <AutomationIcon {...defaultProps} />
    break
  default:
    return null
  }

  return (
    <Suspense>
      {result}
    </Suspense>
  )
}