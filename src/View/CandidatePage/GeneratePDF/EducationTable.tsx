import { EducationType } from "~/hooks/useCandidate";
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
  rowSchool: {
    width: "30%",
  },
  rowFaculty: {
    width: "30%",
  },
  rowStart: {
    width: "20%",
  },
  rowEnd: {
    width: "20%",
  },
});
type Props = {
  education: EducationType[];
};

export const EducationTable = ({ education }: Props) => {
  return (
    <View style={styles.table}>
      <View style={[styles.row, styles.bold, styles.header]}>
        <Text style={styles.rowSchool}>School name</Text>
        <Text style={styles.rowFaculty}>Faculty</Text>
        <Text style={styles.rowStart}>Start date</Text>
        <Text style={styles.rowEnd}>End date</Text>
      </View>
      {education.map((row, i) => {
        return (
          <View key={i} style={styles.row} wrap={false}>
            <Text style={styles.rowSchool}>{row.schoolName}</Text>
            <Text style={styles.rowFaculty}>{row.faculty}</Text>
            <Text style={styles.rowStart}>{row.dateFrom.split("T")[0]}</Text>
            <Text style={styles.rowEnd}>
              {row.dateTo.length === 0 ? "PRESENT" : row.dateTo.split("T")[0]}
            </Text>
          </View>
        );
      })}
    </View>
  );
};
