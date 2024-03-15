import {
  MenuButtonBlockquote,
  MenuButtonBold,
  MenuButtonBulletedList,
  MenuButtonCode,
  MenuButtonCodeBlock,
  MenuButtonItalic,
  MenuButtonRedo,
  MenuButtonUndo,
  MenuControlsContainer,
  MenuDivider,
  MenuSelectHeading,
  RichTextEditor,
  type RichTextEditorRef,
} from "mui-tiptap";
import { EditorEvents } from "@tiptap/core";
import StarterKit from "@tiptap/starter-kit";
import { UseFormReturn } from "react-hook-form";
import { CompanyType } from "../schema";
import { useRef } from "react";

type Props = {
  initialValue?: CompanyType;
  formContext: UseFormReturn<CompanyType>;
};

export const DescriptionForm = ({ formContext, initialValue }: Props) => {
  const rteRef = useRef<RichTextEditorRef>(null);
  const { setValue } = formContext;

  const handleRteOnCreate = (
    field: "description",
    props: EditorEvents["create"]
  ) => {
    if (initialValue === undefined || initialValue[field] === undefined) {
      return;
    }
    props.editor.commands.setContent(initialValue[field]);
  };

  const handleRteOnBlur = (
    field: "description",
    props: EditorEvents["blur"]
  ) => {
    setValue(field, props.editor.getHTML());
  };
  return (
    <RichTextEditor
      ref={rteRef}
      onCreate={(props) => handleRteOnCreate("description", props)}
      onBlur={(props) => handleRteOnBlur("description", props)}
      extensions={[StarterKit]}
      renderControls={() => (
        <MenuControlsContainer>
          <MenuSelectHeading />
          <MenuDivider />
          <MenuButtonBold />
          <MenuButtonItalic />
          <MenuButtonBulletedList />
          <MenuButtonBlockquote />
          <MenuButtonUndo />
          <MenuButtonRedo />
          <MenuButtonCodeBlock />
          <MenuButtonCode />
        </MenuControlsContainer>
      )}
    />
  );
};
