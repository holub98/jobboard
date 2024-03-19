import { LanguagesType } from "~/hooks";
import { StyleSheet, Text, View } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  table: {
    width: "100%",
  },
  row: {
    display: "flex",
    flexDirection: "row",
    borderTop: "1px solid #EEE",
    paddingTop: 8,
    paddingBottom: 8,
  },
  header: {
    borderTop: "none",
  },
  bold: {
    fontWeight: "bold",
  },
  rowName: {
    width: "50%",
  },
  rowLevel: {
    width: "50%",
  },
});
type Props = {
  languages: LanguagesType[];
};

export const LanguageTable = ({ languages }: Props) => {
  return (
    <View style={styles.table}>
      <View style={[styles.row, styles.bold, styles.header]}>
        <Text style={styles.rowName}>Language name</Text>
        <Text style={styles.rowLevel}>Language level</Text>
      </View>
      {languages.map((row, i) => {
        return (
          <View key={i} style={styles.row} wrap={false}>
            <Text style={styles.rowName}>{row.name}</Text>
            <Text style={styles.rowLevel}>{row.level}</Text>
          </View>
        );
      })}
    </View>
  );
};
