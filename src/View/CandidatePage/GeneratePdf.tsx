import { Document, Page, Text, View } from "@react-pdf/renderer";
import { CandidateType } from "~/hooks/useCandidate";

type Props = {
  initialData: CandidateType;
};
export const GeneratePdf = ({ initialData }: Props) => {
  return (
    <Document>
      <Page size="A4">
        <View>
          <Text>{initialData.firstName}</Text>
          <Text>aaa</Text>
        </View>
      </Page>
    </Document>
  );
};
