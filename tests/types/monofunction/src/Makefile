CC = gcc
OUT_DIR = bin
TARGET = run
MKDIR_P = mkdir -p

SRC = $(shell find . -name '*.c')

all: $(OUT_DIR)/$(TARGET)

$(OUT_DIR)/$(TARGET): $(SRC)
	@mkdir -p $(@D)
	$(CC) -o $@ $^ -lm

clean:
	$(RM) $(TARGET)

