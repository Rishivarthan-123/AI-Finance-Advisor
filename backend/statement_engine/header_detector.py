from statement_engine.header_mapper import HeaderMapper


class HeaderDetector:

    @staticmethod
    def detect(table):

        best_score = -1
        best_index = -1
        best_mapping = {}

        # Search only first 30 rows
        for index, row in enumerate(table[:30]):

            mapping = HeaderMapper.map_headers(row)

            score = len(mapping)

            if score > best_score:

                best_score = score
                best_index = index
                best_mapping = mapping

        if best_score < 3:
            return None, None

        return best_index, best_mapping