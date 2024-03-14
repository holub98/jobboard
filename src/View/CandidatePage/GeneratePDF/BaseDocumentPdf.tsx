import {
  Document,
  Page,
  View,
  Text,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";
import roboto400 from "~/assets/Roboto-Regular.ttf";
import roboto700 from "~/assets/Roboto-Bold.ttf";
import { ReactNode } from "react";
import { CompanyType, Offers } from "~/hooks/useCandidate";

Font.register({
  family: "Roboto",
  fonts: [
    { src: roboto400, fontWeight: "normal", fontStyle: "normal" },
    { src: roboto700, fontWeight: "bold", fontStyle: "normal" },
  ],
});

const styles = StyleSheet.create({
  body: {
    padding: "1.9cm",
    paddingTop: "2.4cm",
    fontFamily: "Roboto",
    fontSize: 14,
  },
  footer: {
    position: "absolute",
    fontSize: 12,
    bottom: 0,
    height: "2.5cm",
    paddingHorizontal: "1.9cm",
    right: 0,
    left: 0,
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  header: {
    position: "absolute",
    fontSize: 12,
    top: 0,
    height: "1.9cm",
    paddingHorizontal: "1.9cm",
    right: 0,
    left: 0,
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 16,
  },
});
type Props = {
  offerData: Offers;
  companyData: CompanyType;
  children?: ReactNode;
};
export const BaseDocumentPdf = ({
  offerData,
  companyData,
  children,
}: Props) => {
  return (
    <Document>
      <Page style={styles.body} wrap size="A4">
        <View fixed style={styles.header}>
          <View>
            <Text style={{ fontSize: 17, fontWeight: 700 }}>
              {companyData.name}
            </Text>
            <Text style={{ fontSize: 12, fontWeight: 700 }}>
              {offerData.name}
            </Text>
          </View>
        </View>
        {children}
        <View fixed style={styles.footer}>
          <Text
            render={({ pageNumber, totalPages }) =>
              `${pageNumber} / ${totalPages}`
            }
          />
        </View>
      </Page>
    </Document>
  );
};
